import { createProxyMiddleware } from "http-proxy-middleware";
import express, { Request, Response } from "express";

const proxyMiddleware = createProxyMiddleware<Request, Response>({
  target: "http://www.example.org/api",
  changeOrigin: true,
});
