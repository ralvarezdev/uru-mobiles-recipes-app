import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Recipe } from '@/services/recipe/types';
import { theme } from '@/styles/Theme';

type Props = { recipe: Recipe };

export default function RecipeDetail({ recipe }: Props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.image }} style={styles.hero} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        {!!recipe.description && <Text style={styles.desc}>{recipe.description}</Text>}


        <Text style={styles.section}>INGREDIENTES</Text>
        <View style={{ gap: 6 }}>
          {(recipe.ingredients ?? []).map((ing, i) => (
            <Text key={i}>• {ing}</Text>
          ))}
        </View>

        <Text style={[styles.section, { marginTop: 16 }]}>INSTRUCCIONES</Text>
        <View style={{ gap: 12 }}>
          {(recipe.steps ?? []).map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={{ fontWeight: '700' }}>{i + 1}.</Text>
              <View style={{ flex: 1 }}>
                {!!s.title && <Text style={{ fontWeight: '600' }}>{s.title}</Text>}
                <Text style={{ color: theme.colors.textMuted }}>{s.content}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 24 }} />
      </View>
    </ScrollView>
  );
}

function Meta({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.metaItem}>
      <MaterialCommunityIcons name={icon} size={18} />
      <Text style={styles.metaText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 220 },
  content: { paddingHorizontal: 16, paddingTop: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#FF8C00' },
  desc: { marginTop: 6, color: theme.colors.textMuted, lineHeight: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13 },
  section: { marginTop: 18, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#666' },
});
