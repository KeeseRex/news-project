const {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postComment,
  patchArticleVote,
} = require("../model/app.model");
const endpointData = require("../../endpoints.json");

const searchTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const searchEndpoints = (req, res, next) => {
  res
    .status(200)
    .send({ endpointData })
    .catch((err) => {
      next(err);
    });
};

const searchArticles = (req, res, next) => {
  getArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const searchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const searchCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const addComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  postComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const updateArticleVote = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVote(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(202).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  searchTopics,
  searchEndpoints,
  searchArticleById,
  searchArticles,
  searchCommentsByArticleId,
  addComment,
  updateArticleVote,
};
