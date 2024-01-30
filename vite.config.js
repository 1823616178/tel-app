import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from "node:url";

const base = "/"
export default ({commamd, mode}) => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    const port = env.VITE_APP_PORT || 65101
    return {
        root,
        base,
        server: {
            host: "127.0.0.1",
            port,
            strictPort: false,
            open: true,
            proxy: {
                "/api": {
                    target: env.VITE_APP_DEV_BASE_URL_API,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        plugins: [
            react()
        ],
    }
}
