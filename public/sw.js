import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])

cleanupOutdatedCaches()

const fotoUrl = 'https://demometaway.vps-kinghost.net:8487/api/foto'

registerRoute(
  fotoUrl,
  new CacheFirst({
    cacheName: 'image-api-cache',
  })
)
