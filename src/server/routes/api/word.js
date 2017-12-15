
import Word from '../../models/Word';

export default (router) => {
  router
    /** Get user data from server using token */
    .get('/word', async ctx => {
      let result = await Word.find({});
      ctx.body = {
        error: 0,
        result : result
      }
    })
    .post('/word', async ctx => {
      let body = ctx.request.body;
      let comment = body.comment.replace(/(^\s+)|(\s+$)/g, '');
      let update =  comment ? { comment }: {};
      let result = await Word.findOneAndUpdate({label: body.label}, update,  { upsert: true, 'new': true, setDefaultsOnInsert: true });
      ctx.body = result;
    })
    .post('/words', async ctx => {
      let words = ctx.request.body;
      for(let i = 0; i < words.length; i++){
        try {
          let comment = words[i].comment.replace(/(^\s+)|(\s+$)/g, '');
          let update =  comment ? { comment }: {};
          let result = await Word.findOneAndUpdate({label: words[i].label}, update,  { upsert: true, 'new': true, setDefaultsOnInsert: true });
        } catch(e) {
          console.log(e);
          continue;
        }
      }
      ctx.body = {
        error: 0,
        message: 'add word successful'
      }
    });
};
