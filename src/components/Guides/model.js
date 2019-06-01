const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuideSchema = Schema({
  nameGuide: { type: String, default: '' },
  descGuide: { type: String, default: '' },
  id_subGuide: [{ type: Schema.Types.ObjectId, ref: 'subguides' }],
})

const SubGuideSchema = Schema({
  id_guide: { type: Schema.Types.ObjectId, ref: 'guides' },
  nameSubGuide: { type: String, default: '' },
  desc: { type: String, default: '' },
})

var guideSchema = mongoose.model('guides', GuideSchema);
var subGuideSchema = mongoose.model('subguides', SubGuideSchema)

module.exports.guideSchema = guideSchema;
module.exports.subGuideSchema = subGuideSchema;