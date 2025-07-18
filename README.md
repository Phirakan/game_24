# 24 Cheat Service

Web Application สำหรับหาคำตอบของเกม 24 โดยใช้ตัวเลข 4 ตัวที่กำหนดให้ มาบวก ลบ คูณ หาร กันให้ได้ผลลัพธ์เท่ากับ 24

## 🎯 คำอธิบายเกม 24

เกม 24 คือเกมคณิตศาสตร์ที่คุณต้องนำตัวเลข 4 ตัวที่กำหนดให้ มา **บวก ลบ คูณ หาร** กันให้ได้ผลลัพธ์เท่ากับ **24**

### กฎของเกม:
1. มีตัวเลขให้ 4 ตัว ตัวเลขสามารถซ้ำกันได้ แต่ **ห้ามมีเลข 0** เด็ดขาด
2. ต้องใช้ตัวเลขทั้ง 4 ตัวให้ครบ และ **ห้ามใช้ตัวเลขซ้ำ**
3. คุณสามารถใช้วงเล็บได้ตามความเหมาะสม

### ตัวอย่าง:
- **ตัวเลข:** 6, 4, 3, 2
- **คำตอบที่เป็นไปได้:** `6*4*(3-2)` หรือ `6*2+4*3`

## 🏗️ สถาปัตยกรรม

### Frontend
- **React** + **TypeScript** + **SWC**
- **TailwindCSS** สำหรับ Styling
- **Axios** สำหรับ HTTP Client

### Backend
- **AdonisJS 6** (Node.js Framework)
- **MySQL** Database
- **JWT Authentication**
- **bcrypt** สำหรับ Password Hashing

## 🚀 การติดตั้งและรันระบบ
### Note: โปรเจ็คนี้ยังไม่มี Docker configuration เนื่องจากข้อจำกัดด้านเวลา แต่สามารถรันได้ปกติผ่าน local development environment
### Prerequisites
- Node.js (v18 หรือสูงกว่า)
- MySQL
- Xampp
- npm 

### 1. Clone Repository
```bash
git clone <repository-url>
cd game_24
```

### 2. ตั้งค่า Backend

```bash
cd backend
npm install
```

#### สร้างไฟล์ .env
```env
PORT=3333
HOST=localhost
NODE_ENV=development
APP_KEY=your-app-key-here

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_DATABASE=game_24_db

JWT_SECRET=your-jwt-secret-here
```

#### สร้างและ Migrate Database
```bash
# สร้าง Database
cd C:\xampp\mysql\bin

mysql -u root -p -e "CREATE DATABASE game_24_db;"

#หรือ
start Apache & MySQL ใน Xampp
เปิดเบราว์เซอร์ไปที่ http://localhost/phpmyadmin
คลิกที่ "Databases" tab
ใส่ชื่อ database: game_24_db
คลิก "Create"

# รัน Migration
node ace migration:run

```

#### รัน Backend Server
```bash
npm run dev
```
Backend จะรันที่ `http://localhost:3333`

### 3. ตั้งค่า Frontend

```bash
cd frontend
npm install
```

#### สร้างไฟล์ .env
```env
VITE_API_BASE_URL=http://localhost:3333
```

#### รัน Frontend Server
```bash
npm run dev
```
Frontend จะรันที่ `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### สมัครสมาชิก
```http
POST /api/signup
Content-Type: application/json

{
  "username": "admin",
  "password": "admin1234"
}
```

#### เข้าสู่ระบบ
```http
POST /api/signin
Content-Type: application/json

{
  "username": "admin",
  "password": "admin1234"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

#### ออกจากระบบ
```http
POST /api/signout
Authorization: Bearer <token>
```

### Game Endpoints

#### ขอเฉลยคำตอบ
```http
GET /api/get-answers?numbers=6,4,3,2
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "numbers": [6, 4, 3, 2],
  "solutions": [
    "6*4*(3-2)",
    "6*2+4*3",
    "(6+4)*3-2",
    "6*4-3+2"
  ]
}
```

**กรณีไม่พบคำตอบ:**
```json
{
  "success": false,
  "message": "No solution found for the given numbers",
  "numbers": [1, 1, 1, 1],
  "solutions": []
}
```

### Answer CRUD Endpoints

#### ดึงคำตอบทั้งหมด
```http
GET /api/answers
Authorization: Bearer <token>
```

#### ดึงคำตอบตาม ID
```http
GET /api/answers/:id
Authorization: Bearer <token>
```

#### สร้างคำตอบใหม่
```http
POST /api/answers
Authorization: Bearer <token>
Content-Type: application/json

{
  "numbers": [6, 4, 3, 2],
  "solutions": ["6*4*(3-2)", "6*2+4*3"]
}
```

#### อัปเดตคำตอบ
```http
PUT /api/answers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "numbers": [6, 4, 3, 2],
  "solutions": ["6*4*(3-2)", "6*2+4*3", "(6+4)*3-2"]
}
```

#### ลบคำตอบ
```http
DELETE /api/answers/:id
Authorization: Bearer <token>
```

## 🎨 Frontend Features

### 1. หน้า Signup
- ฟอร์มสมัครสมาชิกพร้อม validation
- ตรวจสอบความถูกต้องของข้อมูล
- แสดงข้อความแจ้งเตือนเมื่อสมัครสำเร็จหรือล้มเหลว

### 2. หน้า Signin
- ฟอร์มเข้าสู่ระบบ
- จัดการ JWT Token
- Redirect ไปหน้า Get Answers เมื่อเข้าสู่ระบบสำเร็จ

### 3. หน้า Get Answers
- Input fields สำหรับใส่ตัวเลข 4 ตัว
- ปุ่มค้นหาคำตอบ
- แสดงผลคำตอบที่ได้จาก Backend
- Loading state และ Error handling
- ปุ่ม Logout

## 🔧 Algorithm Implementation

### 24 Game Solver
Backend ใช้ Algorithm ที่พัฒนาขึ้นเองในการหาคำตอบ:

1. **Permutation**: สร้าง permutation ของตัวเลข 4 ตัว
2. **Operator Combination**: ลอง combination ของ operators (+, -, *, /)
3. **Expression Evaluation**: ประเมินผลนิพจน์ทุกแบบที่เป็นไปได้
4. **Bracket Placement**: ลองใส่วงเล็บในตำแหน่งต่างๆ
5. **Result Validation**: ตรวจสอบว่าผลลัพธ์เท่ากับ 24 หรือไม่

### Caching System
- เมื่อมีการเรียก `/api/get-answers` จะตรวจสอบใน Database ก่อน
- หากมีข้อมูลแล้วจะส่งกลับทันที (Cache Hit)
- หากไม่มีจะคำนวณใหม่และบันทึกลง Database (Cache Miss)

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Answers Table
```sql
CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numbers JSON NOT NULL,
  solutions JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🛡️ Security Features

### Password Security
- ใช้ **bcrypt** สำหรับ hash password

### JWT Authentication
- Token มี expiration time
- ใช้ secure secret key
- Token validation บน protected routes


## 🚀 Deployment

### Backend Deployment
```bash
# Production build
npm run build

# Start production server
npm start
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Files จะอยู่ใน dist/ folder
```

## 📁 Project Structure

```
24-cheat-service/
├── backend/
│   ├── app/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Models/
│   │   └── Services/
│   ├── database/
│   │   ├── migrations/
│   ├── start/
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
└── README.md
```

## Develop By Phirakan Khongphaet (mos)
