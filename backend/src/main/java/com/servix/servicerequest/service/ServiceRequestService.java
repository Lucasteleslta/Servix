package com.servix.servicerequest.service;

import com.servix.domain.entity.Proposal;
import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import com.servix.domain.enums.ProposalStatus;
import com.servix.domain.enums.RequestStatus;
import com.servix.domain.repository.ProposalRepository;
import com.servix.domain.repository.ServiceRequestRepository;
import com.servix.domain.repository.UserRepository;
import com.servix.exception.BusinessException;
import com.servix.exception.ResourceNotFoundException;
import com.servix.servicerequest.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceRequestService {

    private final ServiceRequestRepository requestRepository;
    private final ProposalRepository proposalRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ServiceRequestResponse> listOpen(String category, Pageable pageable) {
        return requestRepository
                .findByStatusAndCategory(RequestStatus.PENDING, category, pageable)
                .map(ServiceRequestResponse::from);
    }

    @Transactional(readOnly = true)
    public ServiceRequestResponse getById(UUID id) {
        return requestRepository.findById(id)
                .map(ServiceRequestResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceRequest", id));
    }

    @Transactional(readOnly = true)
    public Page<ServiceRequestResponse> listMyRequests(String email, Pageable pageable) {
        User client = findUser(email);
        return requestRepository.findByClient(client, pageable).map(ServiceRequestResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<ServiceRequestResponse> listAssignedToMe(String email, Pageable pageable) {
        User provider = findUser(email);
        return requestRepository.findByProvider(provider, pageable).map(ServiceRequestResponse::from);
    }

    @Transactional
    public ServiceRequestResponse create(ServiceRequestCreate req, String email) {
        User client = findUser(email);
        ServiceRequest sr = ServiceRequest.builder()
                .client(client)
                .title(req.title())
                .description(req.description())
                .category(req.category())
                .scheduledAt(req.scheduledAt())
                .address(req.address())
                .latitude(req.latitude())
                .longitude(req.longitude())
                .budgetMin(req.budgetMin())
                .budgetMax(req.budgetMax())
                .build();
        return ServiceRequestResponse.from(requestRepository.save(sr));
    }

    @Transactional
    public ServiceRequestResponse updateStatus(UUID id, UpdateStatusRequest req, String email) {
        ServiceRequest sr = findRequest(id);
        User user = findUser(email);

        boolean isClient = sr.getClient().getId().equals(user.getId());
        boolean isProvider = sr.getProvider() != null && sr.getProvider().getId().equals(user.getId());

        if (!isClient && !isProvider) {
            throw new BusinessException("Not allowed to update this request", HttpStatus.FORBIDDEN);
        }

        RequestStatus newStatus = req.status();

        if (newStatus == RequestStatus.CANCELLED && !isClient) {
            throw new BusinessException("Only the client can cancel a request", HttpStatus.FORBIDDEN);
        }
        if (newStatus == RequestStatus.COMPLETED && !isProvider) {
            throw new BusinessException("Only the assigned provider can mark as completed", HttpStatus.FORBIDDEN);
        }

        sr.setStatus(newStatus);
        return ServiceRequestResponse.from(requestRepository.save(sr));
    }

    @Transactional
    public void delete(UUID id, String email) {
        ServiceRequest sr = findRequest(id);
        if (!sr.getClient().getEmail().equals(email)) {
            throw new BusinessException("Not allowed to delete this request", HttpStatus.FORBIDDEN);
        }
        if (sr.getStatus() != RequestStatus.PENDING) {
            throw new BusinessException("Only pending requests can be deleted", HttpStatus.CONFLICT);
        }
        requestRepository.delete(sr);
    }

    // --- Proposals ---

    @Transactional(readOnly = true)
    public List<ProposalResponse> listProposals(UUID requestId, String email) {
        ServiceRequest sr = findRequest(requestId);
        if (!sr.getClient().getEmail().equals(email)) {
            throw new BusinessException("Not allowed to view proposals for this request", HttpStatus.FORBIDDEN);
        }
        return proposalRepository.findByRequest(sr).stream().map(ProposalResponse::from).toList();
    }

    @Transactional
    public ProposalResponse submitProposal(UUID requestId, ProposalCreate req, String email) {
        ServiceRequest sr = findRequest(requestId);
        User provider = findUser(email);

        if (sr.getStatus() != RequestStatus.PENDING) {
            throw new BusinessException("Request is not open for proposals", HttpStatus.CONFLICT);
        }
        if (proposalRepository.existsByRequestAndProvider(sr, provider)) {
            throw new BusinessException("You already submitted a proposal for this request", HttpStatus.CONFLICT);
        }

        Proposal proposal = Proposal.builder()
                .request(sr)
                .provider(provider)
                .price(req.price())
                .estimatedDuration(req.estimatedDuration())
                .message(req.message())
                .build();

        return ProposalResponse.from(proposalRepository.save(proposal));
    }

    @Transactional
    public ProposalResponse acceptProposal(UUID requestId, UUID proposalId, String email) {
        ServiceRequest sr = findRequest(requestId);

        if (!sr.getClient().getEmail().equals(email)) {
            throw new BusinessException("Only the client can accept proposals", HttpStatus.FORBIDDEN);
        }
        if (sr.getStatus() != RequestStatus.PENDING) {
            throw new BusinessException("Request is not open for proposals", HttpStatus.CONFLICT);
        }

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal", proposalId));

        if (!proposal.getRequest().getId().equals(requestId)) {
            throw new BusinessException("Proposal does not belong to this request", HttpStatus.BAD_REQUEST);
        }

        proposalRepository.findByRequest(sr).forEach(p -> {
            if (!p.getId().equals(proposalId)) {
                p.setStatus(ProposalStatus.REJECTED);
                proposalRepository.save(p);
            }
        });

        proposal.setStatus(ProposalStatus.ACCEPTED);
        sr.setStatus(RequestStatus.ACCEPTED);
        sr.setProvider(proposal.getProvider());

        requestRepository.save(sr);
        return ProposalResponse.from(proposalRepository.save(proposal));
    }

    private ServiceRequest findRequest(UUID id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceRequest", id));
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));
    }
}
