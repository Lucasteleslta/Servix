import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ProviderRootParamList } from '../../navigation/ProviderNavigator';
import { reviewService, ReviewItem } from '../../services/review.service';
import { api } from '../../services/api';

type Props = {
  navigation: NativeStackNavigationProp<ProviderRootParamList, 'ReceivedReviews'>;
};

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Ionicons
          key={s}
          name={s <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color={Colors.warning}
        />
      ))}
    </View>
  );
}

export function ReceivedReviewsScreen({ navigation }: Props) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data: providerProfile } = await api.get<any>('/providers/me');
        const providerId = providerProfile?.id;
        if (providerId) {
          const list = await reviewService.getByProvider(providerId);
          setReviews(list);
        } else {
          setReviews([]);
        }
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const renderReview = ({ item }: { item: ReviewItem }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewAvatar}>
          <Text style={styles.reviewAvatarText}>
            {(item.reviewerName ?? 'U')[0].toUpperCase()}
          </Text>
        </View>
        <View style={styles.reviewMeta}>
          <Text style={styles.reviewerName}>{item.reviewerName ?? 'Usuário'}</Text>
          <StarRow rating={item.rating} size={14} />
        </View>
        <Text style={styles.reviewDate}>
          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      {item.comment ? (
        <Text style={styles.reviewComment}>{item.comment}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliações recebidas</Text>
        <View style={styles.backBtn} />
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.bigRating}>{reviews.length > 0 ? avgRating.toFixed(1) : '—'}</Text>
            <StarRow rating={avgRating} size={20} />
            <Text style={styles.totalCount}>{reviews.length} avaliações</Text>

            <View style={styles.breakdownList}>
              {ratingCounts.map(({ star, count }) => (
                <View key={star} style={styles.breakdownRow}>
                  <Text style={styles.breakdownStar}>{star}★</Text>
                  <View style={styles.breakdownTrack}>
                    <View
                      style={[
                        styles.breakdownFill,
                        {
                          width: reviews.length > 0
                            ? `${(count / reviews.length) * 100}%`
                            : '0%',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.breakdownCount}>{count}</Text>
                </View>
              ))}
            </View>
          </View>
        }
        renderItem={renderReview}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhuma avaliação recebida ainda</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  listContent: { paddingBottom: 20 },
  summaryCard: {
    margin: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  bigRating: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
  },
  totalCount: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 8,
    marginBottom: 16,
  },
  breakdownList: { width: '100%', gap: 8 },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  breakdownStar: { width: 24, fontSize: 12, color: Colors.textMuted, textAlign: 'right' },
  breakdownTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: 6,
    backgroundColor: Colors.warning,
    borderRadius: 3,
  },
  breakdownCount: { width: 24, fontSize: 12, color: Colors.textMuted },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  reviewMeta: { flex: 1, gap: 4 },
  reviewerName: { fontSize: 14, fontWeight: '600', color: Colors.white },
  reviewDate: { fontSize: 11, color: Colors.textMuted },
  reviewComment: { fontSize: 13, color: Colors.textMuted, lineHeight: 20 },
  empty: { paddingTop: 40, alignItems: 'center' },
  emptyText: { color: Colors.textMuted, fontSize: 14 },
});
