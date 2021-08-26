const express = require("express");
const router = express.Router();
const loginRoutes = require("./login");
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find()
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(400).json({ message: e }));
});

router.get("/:userID", function (req, res, next) {
  if (req.params.userID == "login") {
    next();
  } else {
    User.findById({ _id: req.params.userID })
      .then((data) => res.status(200).json(data))
      .catch((e) => res.status(400).json({ message: e }));
  }
});

router.post("/", (req, res) => {
  const user = new User({
    gender: req.body.gender,
    name: {
      title: req.body.name.title,
      first: req.body.name.first,
      last: req.body.name.last,
    },
    location: {
      street: {
        number: req.body.location.street.number,
        name: req.body.location.street.name,
      },
      city: req.body.location.city,
      state: req.body.location.state,
      country: req.body.location.country,
      postcode: req.body.location.postcode,
      coordinates: {
        latitude: req.body.location.coordinates.latitude,
        longitude: req.body.location.coordinates.longitude,
      },
      timezone: {
        offset: req.body.location.timezone.offset,
        description: req.body.location.timezone.description,
      },
    },
    email: req.body.email,
    login: {
      uuid: req.body.login.uuid,
      username: req.body.login.username,
      password: req.body.login.password,
      salt: req.body.login.salt,
      md5: req.body.login.md5,
      sha1: req.body.login.sha1,
      sha256: req.body.login.sha256,
    },
    dob: {
      date: req.body.dob.date,
      age: req.body.dob.age,
    },
    registered: {
      date: req.body.registered.date,
      age: req.body.registered.age,
    },
    phone: req.body.phone,
    cell: req.body.cell,
    _id_: {
      name: req.body.id.name,
      value: req.body.id.value,
    },
    picture: {
      large: req.body.picture.large,
      medium: req.body.picture.medium,
      thumbnail: req.body.picture.thumbnail,
    },
    nat: req.body.nat,
  });
  user
    .save()
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(400).json({ message: e }));
});

router.delete("/:userID", (req, res) => {
  User.deleteOne({ _id: req.params.userID })
    .then(() => res.status(200).json({ message: "User deleted" }))
    .catch((e) => res.status(400).json({ message: e }));
});

router.patch("/:userID", (req, res) => {
  User.updateOne(
    { _id: req.params.userID },
    {
      gender: req.body.gender,
      name: {
        title: req.body.name.title,
        first: req.body.name.first,
        last: req.body.name.last,
      },
      location: {
        street: {
          number: req.body.location.street.number,
          name: req.body.location.street.name,
        },
        city: req.body.location.city,
        state: req.body.location.state,
        country: req.body.location.country,
        postcode: req.body.location.postcode,
        coordinates: {
          latitude: req.body.location.coordinates.latitude,
          longitude: req.body.location.coordinates.longitude,
        },
        timezone: {
          offset: req.body.location.timezone.offset,
          description: req.body.location.timezone.description,
        },
      },
      email: req.body.email,
      login: {
        uuid: req.body.login.uuid,
        username: req.body.login.username,
        password: req.body.login.password,
        salt: req.body.login.salt,
        md5: req.body.login.md5,
        sha1: req.body.login.sha1,
        sha256: req.body.login.sha256,
      },
      dob: {
        date: req.body.dob.date,
        age: req.body.dob.age,
      },
      registered: {
        date: req.body.registered.date,
        age: req.body.registered.age,
      },
      phone: req.body.phone,
      cell: req.body.cell,
      _id_: {
        name: req.body._id_.name,
        value: req.body._id_.value,
      },
      picture: {
        large: req.body.picture.large,
        medium: req.body.picture.medium,
        thumbnail: req.body.picture.thumbnail,
      },
      nat: req.body.nat,
    }
  )
    .then((data) => res.status(200).json({ message: "User updated" }))
    .catch((e) => res.status(400).json({ message: e }));
});

router.use("/login", loginRoutes);

module.exports = router;
