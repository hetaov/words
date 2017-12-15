import mongoose from 'mongoose-fill';

const ObjectId = mongoose.Schema.Types.ObjectId;

const WordSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
    index: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('Word', WordSchema);