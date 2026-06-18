// src/index.ts
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// 让 Express 能解析 JSON 格式的请求体（以后连数据库会用到）
app.use(express.json());

// GET 接口：测试服务器是否活着
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Hello Backend! Your Mac is now a server.');
});

// POST 接口：模拟接收数据（暂时存在内存里）
app.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log('收到用户数据：', { name, email });
  // 这里以后会存数据库，现在先返回成功信息
  res.json({ 
    success: true, 
    message: `用户 ${name} 已创建（模拟）`,
    data: { name, email }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`✅ 服务器已启动：http://localhost:${port}`);
  console.log(`📡 测试 GET：在浏览器打开上面地址`);
  console.log(`📡 测试 POST：用 Postman 或 curl 请求 http://localhost:${port}/users`);
});




// 你现在应该建立的一个核心认知
// 你现在的Mac + VS Code + Node，就是一套完整的“开发版服务器”。
// 公司里的Linux服务器，本质上就是在跑一个和你现在写的index.ts编译后的dist/index.js一模一样的代码。区别只是：

// 公司服务器有公网IP，你的只有localhost

// 公司服务器连的是生产数据库，你连的是本地模拟数据

// 公司服务器用PM2或Docker守护进程，你用nodemon自动重启