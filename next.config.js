/** @type {import('next').NextConfig} */
const path = require('path');

const cookieObj = {
  type: 'cookie',
  key: 'token_sciflutter'
}

const adminCookie = {
  type: 'cookie',
  key: 'sciflutter_admin'
}

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/sciflutter/**",
      },
      {
        protocol: "https",
        hostname: "sciflutter-storage.s3.amazonaws.com",
        port: '',
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/user",
        destination: "/",
        permanent: true,
      },
      {
        source: "/article",
        destination: "/",
        permanent: true,
      },
      {
        source: "/confirm",
        destination: "/",
        permanent: true,
      },
      {
        source: "/recover",
        destination: "/",
        permanent: true,
      },
      {
        source: "/login",
        has: [cookieObj],
        destination: "/",
        permanent: true,
      },
      {
        source: "/forgot-password",
        has: [cookieObj],
        destination: "/",
        permanent: true,
      },
      {
        source: "/signup",
        has: [cookieObj],
        destination: "/",
        permanent: true,
      },
      {
        source: "/recover/:token*",
        has: [cookieObj],
        destination: "/",
        permanent: true,
      },
      {
        source: "/settings",
        missing: [cookieObj],
        destination: "/login",
        permanent: true,
      },
      {
        source: "/drafts",
        missing: [cookieObj],
        destination: "/login",
        permanent: true,
      },
      {
        source: "/saves",
        missing: [cookieObj],
        destination: "/login",
        permanent: true,
      },
      {
        source: "/settings/(.*)",
        missing: [cookieObj],
        destination: "/login",
        permanent: true,
      },
      {
        source: "/requests",
        missing: [adminCookie, cookieObj],
        destination: "/",
        permanent: true,
      },
      {
        source: "/request",
        destination: "/",
        permanent: true,
      },
      {
        source: "/request/:requestId",
        missing: [adminCookie, cookieObj],
        destination: "/",
        permanent: true,
      },
      {
        source: "/settings/((?!privacity).*)",
        destination: "/settings/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig
