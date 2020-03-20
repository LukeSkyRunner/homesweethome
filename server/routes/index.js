'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const uploader = require('./../multer-configure.js');
const Annoucement = require('./../models/announcement');
const Building = require('./../models/building');
const Post = require('./../models/post');
const Doc = require('./../models/doc');
const Calendar = require('../models/calendar.js');
const Services = require('./../models/services');
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

router.post('/annoucement', uploader.single('picture'), (req, res, next) => {
  const { title, description } = req.body;
  let url;
  let buildingId = req.user.buildingId;
  if (req.file) {
    url = req.file.url;
  }

  Annoucement.create({
    title,
    description,
    picture: url,
    creator: req.user._id,
    buildingId
  })
    .then(annoucement => {
      res.json({ annoucement });
    })
    .catch(error => {
      next(error);
    });
});
module.exports = router;

router.get('/annoucement', (req, res, next) => {
  let buildingId = req.user.buildingId;
  Annoucement.find({ buildingId: buildingId })
    .sort({ timestamp: 'descending' })
    .then(annoucements => {
      res.json({ annoucements });
      console.log({ annoucements }, '123');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/building', uploader.single('picture'), (req, res, next) => {
  const numberOfApartments = JSON.parse(req.body.numberOfApartments);
  const { name, address, numberOfFloors, admin, picture } = req.body;
  let url;
  if (req.file) {
    url = req.file.url;
  }
  Building.create({
    name,
    address,
    numberOfFloors,
    admin,
    numberOfApartments,
    picture: url
  })
    .then(building => {
      res.json({ building });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/building', (req, res, next) => {
  let building = req.user.buildingId;

  return (
    Building.findById(building)
      // this id is the buiding to find it
      .then(building => {
        console.log('Searching for:', building);
        res.json({ building });
      })
      .catch(error => {
        next(error);
      })
  );
});

router.post('/updateBuilding', (req, res, next) => {
  console.log('in the server right now', req.body);
  const id = req.body.id;
  const numberOfApartments = req.body.list;
  console.log('this is id', numberOfApartments);
  return (
    Building.findByIdAndUpdate(id, { numberOfApartments })
      // this id is the buiding to find it
      .then(building => {
        console.log('Searching for:', building);
        res.json({ building });
      })
      .catch(error => {
        console.log(error);
        next(error);
      })
  );
});

router.post('/doc', uploader.single('doc'), (req, res, next) => {
  const { title, description } = req.body;
  let url;
  let buildingId = req.user.buildingId;
  if (req.file) {
    url = req.file.url;
  }

  Doc.create({
    title,
    description,
    doc: url,
    creator: req.user._id,
    buildingId
  })
    .then(doc => {
      res.json({ doc });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/doc', (req, res, next) => {
  let buildingId = req.user.buildingId;
  Doc.find({ buildingId: buildingId })
    .sort({ timestamp: 'descending' })
    .then(doc => {
      res.json({ doc });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/post', uploader.single('picture'), (req, res, next) => {
  const { title, description } = req.body;
  console.log('body', req.body);
  console.log('user', req.user);
  let url;
  let buildingId = req.user.buildingId;

  if (req.file) {
    url = req.file.url;
  }

  Post.create({
    title,
    description,
    picture: url,
    buildingId
  })
    .then(post => {
      res.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/post', (req, res, next) => {
  let buildingId = req.user.buildingId;
  Post.find({ buildingId: buildingId })
    .sort({ timestamp: 'descending' })
    .then(posts => {
      res.json({ posts });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/services', (req, res, next) => {
  const { name, workField, price, phoneNumber } = req.body;
  let buildingId = req.user.buildingId;
  Services.create({
    name,
    workField,
    price,
    phoneNumber,
    buildingId
  })
    .then(services => {
      res.json({ services });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/services', (req, res, next) => {
  let buildingId = req.user.buildingId;
  Services.find({ buildingId: buildingId })
    .sort({ timestamp: 'descending' })
    .then(services => {
      res.json({ services });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/calendar', (req, res, next) => {
  const { title, start } = req.body;
  let buildingId = req.user.buildingId;
  Calendar.create({
    title,
    start,
    buildingId
  })
    .then(calendar => {
      res.json({ calendar });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/calendar', (req, res, next) => {
  let buildingId = req.user.buildingId;
  Calendar.find({ buildingId: buildingId })
    .then(calendar => {
      res.json({ calendar });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sendEmail', (req, res, next) => {
  const mail = req.body.name;
  const buildingId = req.body.buildingId;
  const slotId = req.body.slotId;
  console.log('This is my friend', mail, buildingId, slotId);

  const nodemailer = require('nodemailer');
  const EMAIL = process.env.BRAND_EMAIL;
  const PASSWORD = process.env.BRAND_EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });

  return transporter.sendMail({
    from: `Welcome to Home Sweet Home <${EMAIL}>`,
    to: mail,
    subject: 'Hello from the Home Sweet Home',
    html: `<br /><br /><br />You were invited to your new home! Follow the link to know your new home: ${process.env.WORKING_URL2}/sign-up/user/${slotId}/${buildingId}`
  });
});

router.post('/updateProfile', (req, res, next) => {
  console.log('in the server right now', req.body);
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const id = req.body.id;
  console.log('this is id', { name, email, phoneNumber });
  return (
    User.findByIdAndUpdate(id, { name, email, phoneNumber })
      // this id is the buiding to find it
      .then(building => {
        console.log('Searching for:', building);
        res.json({ building });
      })
      .catch(error => {
        console.log(error);
        next(error);
      })
  );
});
