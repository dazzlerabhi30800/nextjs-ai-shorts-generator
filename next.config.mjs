/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["cdn.dummyjson.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lottie.host",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
