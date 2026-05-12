# simpleShare

A lightweight self-hosted file sharing website created to utilize the free **200GB Oracle Cloud storage**.  
Built as a simple personal web-based storage and sharing solution.

🌐 Live Demo: http://cgarnaik.duckdns.org/  
This user has only view access:

USER: test@gmail.com

PASS: 12345678

📦 Repository: https://github.com/ChinmayaGit/simpleShare

---

## ✨ Features

- 📁 Upload and manage files through a web interface
- 🌍 Access files remotely from anywhere
- 💾 Uses free Oracle Cloud storage
- ⚡ Lightweight and simple setup
- 🐧 Hosted on Ubuntu with Nginx
- 🔗 Public sharing support
- ☁️ Self-hosted alternative to cloud drives

---

## 🛠️ Tech Stack

- **Backend:** Node.js / Express
- **Frontend:** HTML, CSS, JavaScript
- **Server:** Nginx
- **Hosting:** Oracle Cloud Free Tier
- **Domain:** DuckDNS

---

## 🚀 Why I Built This

Most cloud storage platforms require subscriptions for large storage access.  
Oracle Cloud provides up to **200GB of free block storage**, so I built this project to make practical use of that storage through a simple self-hosted web application.

This project was mainly created for:

- Personal file storage
- Quick file sharing
- Learning self-hosting and deployment
- Exploring cloud infrastructure

---

## 📸 Preview

Visit the live site:

👉 http://cgarnaik.duckdns.org/

---

## ⚙️ Deployment Overview

The application is hosted on:

- Oracle Cloud VM
- Ubuntu Server
- Nginx Reverse Proxy
- DuckDNS Dynamic Domain

---

## 🔧 Basic Setup

```bash
git clone https://github.com/ChinmayaGit/simpleShare.git

cd simpleShare

npm install

npm start
```

---

## 🌐 Nginx Reverse Proxy Example

```nginx
server {
    listen 80;
    server_name your-domain.duckdns.org;

    location / {
        proxy_pass http://localhost:3000;
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📌 Future Improvements

- User authentication
- File expiration links
- Drag & drop uploads
- Mobile responsive UI
- Storage usage analytics
- Multiple user support
- File encryption

---

## 🤝 Contributions

Contributions, ideas, and improvements are welcome.

Feel free to fork the project and submit a PR.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Made by Chinmaya Garnaik

GitHub: https://github.com/ChinmayaGit
