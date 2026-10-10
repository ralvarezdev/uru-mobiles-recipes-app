# uru-mobiles-recipes-app

Recipes mobile app built with Expo / React Native, for the Mobile Development college course. Users log in/register, browse recipe categories and groups, view and create recipes, and manage their own recipes under their profile. It is the client for the `uru-mobiles-recipes-api` backend (see `uru-mobiles-recipes` for the full deployment).

## Tech stack

- **Expo SDK 54** / **React Native 0.81** / **React 19**, routed with **expo-router** (file-based routing, typed routes)
- **Axios** HTTP client with retry/backoff and offline detection (`@react-native-community/netinfo`), `@react-native-async-storage/async-storage` for local persistence
- **react-hook-form** for form state
- **React Navigation** (material top tabs, tab view, pager view)
- **TypeScript** 5.9

## Project structure

```
src/
  app/                       # expo-router routes: (auth)/login|register, (tabs)/(home)/*, (tabs)/recipe/create, (tabs)/profile
  api/                       # httpClient.ts (Axios retry/backoff), errors.ts, queryString.ts
  components/common/         # RecipeCard, GroupCard, CategoryCard, Form, ActionMenu, ...
  types/api/
```

## Configuration

The API client defaults to `http://10.0.2.2:3000/api` (the Android emulator loopback alias) when no explicit `baseURL` is passed to `src/api/httpClient.ts`. Point it at a running `uru-mobiles-recipes-api` instance via the `ApiConfig` used when constructing the client.

## Running

```bash
npm install
npm run start      # expo start
npm run ios
npm run android
npm run web
```

## Related repositories

- [`uru-mobiles-recipes-api`](https://github.com/ralvarezdev/uru-mobiles-recipes-api) — matching API.
- [`uru-mobiles-recipes`](https://github.com/ralvarezdev/uru-mobiles-recipes) — Docker deployment setup.

## License

GNU General Public License v3.0 (see `LICENSE`).
