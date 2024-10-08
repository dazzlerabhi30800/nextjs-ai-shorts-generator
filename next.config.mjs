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
            {
                protocol: "https",
                hostname: "pollinations.ai",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
