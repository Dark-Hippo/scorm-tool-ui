import { HttpProxy, ProxyOptions, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy: HttpProxy.Server, options: ProxyOptions) => {
            proxy.on('error', (err, req, res) => {
              const { method, url } = req;
              console.error(
                `[vite] [proxy] ${method} ${url} => errored with: ${err.message}`
              );
            });
            proxy.on('proxyReq', (proxyReq, req, res, options) => {
              const { method, url } = req;
              console.log(
                `[vite] [proxy] ${method} ${url} => ${proxyReq.getHeader(
                  'host'
                )}${proxyReq.path}`
              );
            });
          },
        },
      },
    },
  };
});
