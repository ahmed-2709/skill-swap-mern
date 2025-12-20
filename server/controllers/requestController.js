const Request = require("../models/request");

exports.sendRequest = async (req, res) => {
    try {
        const {to, skillOffered, skillWanted} = req.body;
        const request = new Request({
            from: req.user,
            to,
            skillOffered,
            skillWanted
        });
        await request.save();
        res.json({message: "Request Sent", request});
    } catch (error) {
        res.status(500).json({message: "Error sending request", error: error.message})
    }
};

exports.recieveRequest = async (req, res) => {
 try {
    const requests = await Request.find({ to:  req.user})
    .populate("from", "username email");
    res.json(requests);
 } catch (error) {
    res.status(500).json({message: "Error fetching requests", error: error.message})
 }
};

exports.updateRequest = async (req, res) => {
    try {
        const { requestId, status} = req.body;
        const request = Request.findOneAndUpdate({
            _id: requestId, to: req.user},
        { status },
        {
        new: true
       });
       if(!request)
        return res.status(404).json({ message: "Request not found"});
    res.json({ message: "Request updated", request});
    } catch (error) {
        res.status(500).json({message: "Error updating request", error: error.message});
    }
};
