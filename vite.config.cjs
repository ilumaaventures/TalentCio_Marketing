const path = require('path');
const vitePrerender = require('vite-plugin-prerender');

const Renderer = vitePrerender.PuppeteerRenderer;

module.exports = async () => {
  const { defineConfig } = await import('vite');
  const react = (await import('@vitejs/plugin-react')).default;

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/',
          '/features',
          '/pricing',
          '/about',
          '/contact',
          '/demo',
          '/jobs',
          '/terms',
          '/privacy',
          '/cookies'
        ],
        renderer: new Renderer({
          inject: {
            prerender: true
          },
          headless: true,
          maxConcurrentRoutes: 1,
          renderAfterTime: 1000,
          skipThirdPartyRequests: true
        }),
        postProcess(renderedRoute) {
          renderedRoute.route = renderedRoute.route
            .replace(/\?.*/, '')
            .replace(/#.*/, '');

          renderedRoute.html = renderedRoute.html.replace(
            /http:\/\/localhost:\d+/g,
            'https://talentcio.in'
          );

          return renderedRoute;
        }
      })
    ],
    base: '/',
    server: {
      host: true,
      allowedHosts: 'all'
    },
    build: {
      outDir: 'dist',
      target: 'chrome76'
    }
  });
};
