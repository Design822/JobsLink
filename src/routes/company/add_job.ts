import { Router } from "express";
import {
  getJobs,
  updatejob,
  deleteJob,
  add_job,
  getJobsByCompanyID,
} from "./services/add_job";

const router = Router();

router.route("/").get(getJobs).patch(updatejob).delete(deleteJob);

router.route("/:company_id").get(getJobsByCompanyID).post(add_job);

export default router;
