/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build_node',
    env: {
        API_ACCOUNT_SERVICE: "http://localhost:3000/"
    }
};

export default nextConfig;