const UrlShorten = require('../models/UrlShorten.js');
const DeletedClip = require('../models/deleted-clips.js');

const deleteUrl = (req, res) => {
	UrlShorten.findOneAndDelete({
			urlCode: req.params.urlCode,
			created_by: req.cookies.userId
		},
		(error, clipToDelete) => {
			if (error)
				return res.status(500).json({
					error: error
				});

			if (!clipToDelete)
				return res.status(404).json({
					error: 'Not found'
				});

			const deletedClip = new DeletedClip({
				clipped_url: clipToDelete.clipped_url,
				urlCode: clipToDelete.urlCode
			});

			deletedClip.save((err, savedDeletedClip) => {
				if (err)
					return res.status(500).json({
						error: err
					});

				res.status(202).json({
					message: 'Deleted!',
					deletedUrl: savedDeletedClip
				});
			});
		}
	);
};

module.exports = deleteUrl;