# AIventure - Cloud Computing

**Base URL**  
AIventure API Documentation  
_(Bangkit Product-Based Capstone Project - 2024 CC-50)_

[![View API Documentation](https://img.shields.io/badge/View-API_Documentation-blue?style=for-the-badge&logo=google-cloud)](https://github.com/AiVenture6/Ai-Venture-Cloud-Computing/blob/main/docs/README.md)

---

## **Cloud Technology**

AIventure harnesses the power of **Google Cloud Platform (GCP)** to deliver a scalable, secure, and high-performance backend infrastructure. Below are the key cloud technologies and their roles in enabling a seamless experience for our users.

---

### **Google Cloud Platform**

<img src="https://camo.githubusercontent.com/069cecfd3754787e0d5b39aa9ce5e580eeae41e57e9cc4c518626f2932592827/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35312f476f6f676c655f436c6f75645f6c6f676f2e737667" width="300">

At the heart of AIventure's cloud infrastructure is **GCP**, ensuring reliable, scalable, and efficient service for every user interaction.

---

### **Compute Engine**

<img src="https://idcloudace.wordpress.com/wp-content/uploads/2021/07/image5-1.png?w=300" width="200">

**Compute Engine** powers our primary database, offering robust and scalable SQL database management on virtual machines.

- **Database Type:** SQL
- **Zone:** `asia-southeast2-b`
- **Instance Type:** `e2-small`
- **Persistent Disk:** 10 GB

🔗 [Learn More](https://cloud.google.com/compute/docs)

---

### **Cloud Storage**

<img src="https://camo.githubusercontent.com/e55c210b60131e04d11140dda9448dca3cccd985290c60e50eed480c14a343a6/68747470733a2f2f73796d626f6c732e67657476656374612e636f6d2f7374656e63696c5f342f34375f676f6f676c652d636c6f75642d73746f726167652e666565323633643333612e737667" width="100">

All user-uploaded files and application assets are securely stored using **Cloud Storage**, ensuring fast access with regional redundancy.

- **Storage Class:** Standard
- **Region:** `asia-southeast2`

🔗 [Learn More](https://cloud.google.com/storage/docs)

---

### **Cloud Run**

<img src="https://camo.githubusercontent.com/0d6914bd2bf02d6e9dbaa96c4c5ca3e78dc58da77e3b5ac71e88edfe73c8f6bb/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f676f6f676c655f636c6f75645f72756e2f676f6f676c655f636c6f75645f72756e2d617232312e737667" width="300">

**Cloud Run** provides a serverless backend environment for our APIs, with seamless integration with **Cloud Build** for automated deployments.

- **Region:** `asia-southeast2`
- **CPU:** 1 vCPU
- **Memory:** 512 MiB
- **Runtime:** Node.js 20

🔗 [Learn More](https://cloud.google.com/run/docs)

---

## **Integrated Workflow**

We’ve implemented a streamlined DevOps workflow for efficient development and deployment using **Cloud Build** and **GitHub Integration**.

### Workflow at a Glance:

1. 🛠 **GitHub**: Push code to the main branch.
2. 🔄 **Cloud Build**: Automatically build the application.
3. 🚀 **Cloud Run**: Deploy the latest version of the containerized backend.

This ensures that every update is built and deployed without manual intervention, saving time and effort while maintaining stability.

---

## **Get Started**

1. Explore the **[API Documentation](https://github.com/AiVenture6/Ai-Venture-Cloud-Computing/blob/main/docs/README.md)** for detailed API usage.
2. Fork or clone the project from the **[repository](https://github.com/AiVenture6/Ai-Venture-Cloud-Computing)** to contribute or explore.
3. Follow the deployment guides to configure and deploy using Google Cloud Platform.

### ✨ _Ready to dive in?_

Feel free to reach out for collaboration opportunities or further inquiries! Together, let’s redefine the future of tourism recommendations. 🚀
