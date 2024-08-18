import express from "express";
import dotenv from "dotenv";
import categoryRoute from "./routes/category/index";
import companyRoute from "./routes/company/index";
import jobSeeker from "./routes/job_seeker/index";
import adminRouter from "./routes/admin/index";
import path from "path";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/css", express.static(path.join(__dirname, "../frontend/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/js")));
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));
app.use("/image", express.static("public/"));
app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});
app.get("/header", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/header.html"));
});
app.get("/footer", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/footer.html"));
});
app.get("/employee_reg", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/employee_reg.html"));
});
app.get("/employee_login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/employee_login.html"));
});
app.get("/job_seekers_login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/job_seekers_login.html"));
});
app.get("/job_seekers_reg", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/job_seekers_reg.html"));
});
app.get("/all_jobs", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/total_jobs.html"));
});
app.get("/jobs_details", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/job-details-page-job-seekers.html")
  );
});

app.get("/post_job", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/post-your-company-job.html"));
});

app.get("/employee_home", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/empoyee_home.html"));
});

app.use("/category", categoryRoute);
app.use("/company", companyRoute);
app.use("/job_seeker", jobSeeker);
app.use("/admin", adminRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
