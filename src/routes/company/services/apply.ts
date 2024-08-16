import { Request, Response, NextFunction } from "express";
import { errorLog, responder } from "../../../middelware/response";
import db from "../../../config/db";

const getAppliedSeekerByJobID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.addJob_id;
    const addJob = await db("addJob").where({ id: id }).first();
    if (addJob) {
      const getAllJobSeekers = await db("apply")
        .where({ job_id: id })
        .join("addJob", "apply.job_id", "addJob.id")
        .leftJoin("job_seeker", "apply.user_id", "job_seeker.id")
        .select("job_seeker.*", "view")
        .distinct();

      return res
        .status(200)
        .json(responder(true, `People applied for jobs`, getAllJobSeekers));
    } else {
      return res
        .status(404)
        .json(responder(false, `There are no job in id: ${id}`));
    }
  } catch (error) {
    errorLog(error, res, next);
  }
};

const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.addJob_id;
    const { user_id, view, post } = req.body;

    if (!post) {
      return res
        .status(400)
        .json(responder(false, "Please add post you are applying for"));
    }

    const addJob = await db("addJob").where({ id: id }).first();
    if (addJob) {
      await db("apply").insert({
        job_id: id,
        user_id,
        view,
        post,
      });
      return res.status(200).json(responder(true, `Job applied sucessfully`));
    } else {
      return res
        .status(404)
        .json(responder(false, `Jobs not found on id: ${id}`));
    }
  } catch (error) {
    errorLog(error, res, next);
  }
};

const updatedViewBySeekerID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.job_seeker_id;
    const { view, post } = req.body;
    const jobSeeker = await db("apply").where({ user_id: id }).first();
    if (jobSeeker) {
      await db("apply")
        .where({ user_id: id })
        .update({
          view: view || jobSeeker.view,
          post: post || jobSeeker.post,
        });
      return res
        .status(202)
        .json(responder(true, `Applied seekers jobs sucessfully`));
    } else {
      return res
        .status(404)
        .json(responder(false, `There is no job seeker applied for this job`));
    }
  } catch (error) {
    errorLog(error, res, next);
  }
};

export { applyForJob, updatedViewBySeekerID, getAppliedSeekerByJobID };
