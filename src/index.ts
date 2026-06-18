// src/index.ts
import express, { Request, Response } from 'express';

type User = {
  id: number;
  name: string;
  email: string;
};

let users: User[] = [
  { id: 1, name: '小明', email: 'xiaoming@example.com' },
  { id: 2, name: '小红', email: 'xiaohong@example.com' }
];
let nextId = 3;

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

// GET /users 接口：模拟查询所有用户（新增）
app.get('/users', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: '小明', email: 'xiaoming@example.com' },
      { id: 2, name: '小红', email: 'xiaohong@example.com' }
    ]
  });
});

// 更新用户
app.put('/users/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  // 先提取出确定的字符串值
  const idStr = Array.isArray(id) ? id[0] : id;
  if (!idStr || isNaN(Number(idStr))) {
    return res.status(400).json({ success: false, message: '无效的用户 ID' });
  }
  const userId = parseInt(idStr, 10);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: '用户不存在' });
  }
  users[userIndex] = { ...users[userIndex], id: userId, name, email };
  res.json({ success: true, message: `用户 ID ${userId} 已更新`, data: users[userIndex] });
});

// 删除用户
app.delete('/users/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  // 先提取出确定的字符串值
  const idStr = Array.isArray(id) ? id[0] : id;
  if (!idStr || isNaN(Number(idStr))) {
    return res.status(400).json({ success: false, message: '无效的用户 ID' });
  }
  const userId = parseInt(idStr, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: '用户不存在' });
  }
  const deletedUser = users.splice(userIndex, 1)[0]!;
  res.json({ success: true, message: `用户 ${deletedUser.name} 已删除`, data: deletedUser });
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