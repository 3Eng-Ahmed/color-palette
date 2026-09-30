import { Section } from './Section'
import { FavoriteColor } from './FavoriteColor'

interface FavoritesProps {
  favorites: string[]
  onRemove: (hex: string) => void
}

export function Favorites({ favorites, onRemove }: FavoritesProps) {
  return (
    <Section
      title="Favorite colors"
      count={favorites.length}
      emptyMessage="No favorites yet. Tap the heart on any color to keep it here."
    >
      <ul className="flex flex-wrap gap-4">
        {favorites.map(hex => (
          <FavoriteColor key={hex} hex={hex} onRemove={onRemove} />
        ))}
      </ul>
    </Section>
  )
}