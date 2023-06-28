const { Sauce } = require("../models/saucesModel");
const fs = require("fs");

// Création d'une sauce
exports.postsauce = (req, res, next) => {
  try {
    const sauceObject = JSON.parse(req.body.sauce);

    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// Récupérer toutes les sauces
exports.getsauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Récupérer une sauce grâce à son identifiant unique
exports.getsauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Mettre à jour une sauce
exports.updatesauce = (req, res, next) => {
  if (req.file) {
    // Suppression de l'ancienne image si l'image doit être mise à jour
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
        // Mise à jour du reste de l'objet  sauce
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce modifiée!" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    // si l'image n'est pas mise à jour
    const sauceObject = { ...req.body };
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce modifiée!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

//Supprimer une sauce 
exports.deletesauce = (req, res, next) => {
  try {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Gestion des likes
exports.likesauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            // nouvelles valeurs à modifier
            const newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            }
            // Différents cas:
            switch (like) {
                 //sauce liked
                case 1: 
                    newValues.usersLiked.push(userId);
                    break;
                //sauce disliked
                case -1:  
                    newValues.usersDisliked.push(userId);
                    break;
                // annulation du like/dislike
                case 0:
                    if (newValues.usersLiked.includes(userId)) {
                        // annulation like
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    } else {
                        // annulation dislike
                        const index = newValues.usersDisliked.indexOf(userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
            // Calcul du nombre de likes / dislikes
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            
            // Mise à jour de la sauce
            Sauce.updateOne({ _id: sauceId }, newValues )
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => res.status(400).json({ error }))  
        })
        .catch(error => res.status(500).json({ error }));
}
