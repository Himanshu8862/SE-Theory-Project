import Course from "../model/courses.js";

// add the feedback
export let addFeedback = async (req, res) => {
  try {
    console.log("req is: ", req);
    Course.findById({ _id: req.body.id }, (err, course) => {
      if (err) {
        console.error(err);
        res.send("couldn't insert the data ")
      } else {
        let newFeedback = {
          user: req.body.username,
          rate: req.body.rating,
          feedback: req.body.feedback,
        };
        course.Feedback.push(newFeedback);
        course.save(function (err, result) {
          if (err) throw err;
          else console.log(result);
        //   send response
        res.send("succefully inserted");
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get feedback
export let getFeedback = async (req, res) => {
    try {
        Course.findOne({ _id: req.body.id }, (err, course)=>{
            if(err){
                console.log(err);
            }else{
                if(course){
                    return res.status(200).json({auth:true, result : course});
                }else{
                    return res.status(200).json({ auth: false, msg : "No course exist" })
                }
            }
        })  
    } catch (error) {
        console.log(error);        
    }
};
