
module.exports = {

  //! login user *******
  doLogin(db, username, password) {
    return db('tb_user')
      .select('user_username', 'user_password', 'user_id')
      .where('user_username', username)
      .where('user_password', password)
      .limit(1);
  },

  //! login Owner *******
  doLoginOw(db, username, password) {
    return db('tb_owner')
      .select('ow_username', 'ow_password', 'ow_id')
      .where('ow_username', username)
      .where('ow_password', password)
      .limit(1);
  },

  //! login Admin *******
  doLoginAdmin(db, username, password) {
    return db('tb_admin')
      .select('ad_username', 'ad_password', 'ad_id')
      .where('ad_username', username)
      .where('ad_password', password)
      .limit(1);
  },

  // getList(db) {
  //   return db('users').orderBy('id');
  // },

  // save(db, data) {
  //   return db('users').insert(data, 'id');
  // },

  //! regis user *******
  register(db, data) {
    return db('tb_user').insert(data, 'user_id');
  },

  //! regis owner *******
  registerow(db, data) {
    return db('tb_owner').insert(data, 'ow_id');
  },

  //! regis nip. *******
  registernip(db, data, id) {
    return db('tb_night_place').insert(data, 'np_id')
      .leftJoin('tb_owner', 'tb_night_place.id', id, 'tb_owner.ow_id');
  },

  //! แก้ไขข้อมูล user *******
  updateUser(db, id, data) {
    return db('tb_user')
      .where('user_id', id)
      .update(data);
  },

  //! แก้ไขข้อมูล owner *******
  updateOw(db, id, data) {
    return db('tb_owner')
      .where('ow_id', id)
      .update(data);
  },

  //! แก้ไขข้อมูล nip. *******
  updatenip(db, id, data) {
    return db('tb_night_place')
      .where('tb_night_place.np_id', id)
      .update(data);
  },

  remove(db, id, tb) {
    return db(tb)
      .where('user_id', id)
      .del();
  },

  

  //! แสดงข้อมูล user *******
  getInfoUser(db, id) {
    return db('tb_user')
      .where('tb_user.user_id', id)
      .leftJoin('tb_user_img','tb_user.user_id','tb_user_img.user_id')
      .select('*');
  },

  //! แสดงข้อมูล owner *******
  getInfoOw(db, id) {
    return db('tb_owner')
      .where('ow_id', id);
  },

  //! แสดงข้อมูลร้าน by Owner *******
  // getListNpbyOw(db, id) {
  //   return db('tb_night_place')
  //   .orderBy('np_id', 'desc')
  //   .where('ow_id', id);
  // },
  getListNpbyOw(db, id) {
    return db('tb_night_place_imgs_profile').orderBy('imgspro_id', 'desc')
      .where('ow_id', id)
      .leftJoin('tb_night_place', 'tb_night_place_imgs_profile.np_id', 'tb_night_place.np_id')
      .select('*');
  },

  //! แสดงข้อมูลร้านให้ user *******
  // getDataNp(db) {
  //   return db('tb_night_place').orderBy('tb_nigh.t_placenp_id', 'desc')
  //   .leftJoin('tb_night_place_imgs_profile', 'tb_night_place.imgspro_id', 'tb_night_place.imgspro_id')
  //   .select('*');
  // },
  getDataNp(db) {
    return db('tb_night_place_imgs_profile').orderBy('imgspro_id', 'desc')
      .leftJoin('tb_night_place', 'tb_night_place_imgs_profile.np_id', 'tb_night_place.np_id')
      .select('*');
  },


  //! แสดงข้อมูลร้านให้ user test*******
  // getDataNp(db) {
  //   return db('tb_night_place').orderBy('np_id', 'desc')
  //     .leftJoin('tb_night_place_imgs', 'tb_night_place.np_id', 'tb_night_place_imgs.np_id')
  //     // .leftJoin('tb_user', 'tb_reviews.user_id', 'tb_user.user_id')
  //     .select('*');
  // },

  getListImagesNp(db, id) {
    return db('tb_night_place_imgs')
      .where('tb_night_place_imgs.np_id', id)
      .select('*')
    // .leftJoin('tb_night_place_imgs', 'tb_night_place.np_id,tb_night_place_imgs.np_id');
  },

  //! แสดงรูปร้านให user *******
  getImagesNp(db) {
    return db('tb_night_place_imgs').orderBy('np_img_id', 'desc'.limit(1))
      .leftJoin('tb_night_place', 'tb_night_place_imgs.np_id', 'tb_night_place.np_id')
      // .leftJoin('tb_user', 'tb_reviews.user_id', 'tb_user.user_id')
      .select('*')
    // .limit(1);
  },

  //! Get Info ข้อมูลร้าน *******
  getInfoNp(db) {
    return db('tb_night_place')
      .orderBy('np_id', 'desc')
      .select('tb_night_place.np_id')
      .limit(1);
  },

    //! Get Info user for post img*******
    getUser(db) {
      return db('tb_user')
        .orderBy('user_id', 'desc')
        .select('tb_user.user_id')
        .limit(1);
    },

  //! upload immage profile np  *******
  uploadProfileUser(db, data) {
    return db('tb_user_img')
      .insert(data, 'id_img_user');
  },

  //! upload immage profile user *******
  sendImages(db, data, id) {
    return db('tb_user_img')
      .where('user_id', id)
      .update(data);
  },

  //! upload immage profile np  *******
  uploadImagesProfilenp(db, data) {
    return db('tb_night_place_imgs_profile')
      .insert(data, 'imgspro_id');
  },

  //! upload immage np *******
  uploadImagesnp(db, data) {
    return db('tb_night_place_imgs')
      .insert(data, 'np_img_id');
  },

  //! add reviews *******
  addReviews(db, data, id) {
    return db('tb_reviews').insert(data, 'rev_id')
      .leftJoin('tb_user', 'tb_reviews.id', id, 'tb_user.user_id');
  },

  //! แสดง list reviews ให้ user *******
  getListReviews(db, id) {
    return db('tb_reviews').orderBy('rev_id', 'desc')
      .where('tb_reviews.np_id', id)
      .leftJoin('tb_user', 'tb_reviews.user_id', 'tb_user.user_id')
      .leftJoin('tb_user_img', 'tb_reviews.user_id', 'tb_user_img.user_id')
      .select('*');
  },

  //! แสดง list reviews ให้ user limit 3 *******
  getListReviewsLimit(db, id) {
    return db('tb_reviews').orderBy('rev_id', 'desc')
      .where('tb_reviews.np_id', id)
      .leftJoin('tb_user', 'tb_reviews.user_id', 'tb_user.user_id')
      .leftJoin('tb_user_img', 'tb_reviews.user_id', 'tb_user_img.user_id')
      .select('*')
      .limit(3);
  },

  //! แสดง Feed Review ให้ user  *******
  getListReviewsFeed(db) {
    return db('tb_reviews').orderBy('rev_id', 'desc')
      .leftJoin('tb_user', 'tb_reviews.user_id', 'tb_user.user_id')
      .leftJoin('tb_user_img', 'tb_reviews.user_id', 'tb_user_img.user_id')
      .leftJoin('tb_night_place', 'tb_reviews.np_id', 'tb_night_place.np_id')
      .select('*');
  },

  //! add bookings *******
  addBookings(db, data, id) {
    return db('tb_booking').insert(data, 'bk_id')
      .leftJoin('tb_user', 'tb_booking.id', id, 'tb_user.user_id');
  },

  //! แสดง Bookings ให้ user  *******
  getBookingsbyuser(db, id) {
    return db('tb_booking').orderBy('bk_id', 'desc')
      .where('tb_booking.user_id', id)
      .leftJoin('tb_user', 'tb_booking.user_id', 'tb_user.user_id')
      .leftJoin('tb_night_place', 'tb_booking.np_id', 'tb_night_place.np_id')
      .select('*');
  },

  //! แสดง Bookings ให้ owner  *******
  getBookingsbyow(db, id) {
    return db('tb_booking').orderBy('bk_id', 'desc')
      .where('ow_id', id)
      .leftJoin('tb_user', 'tb_booking.user_id', 'tb_user.user_id')
      .leftJoin('tb_night_place', 'tb_booking.np_id', 'tb_night_place.np_id')
      .select('*');
  },

  //! update status *******
  updateBookingsstatus(db, data, id) {
    return db('tb_booking')
      .where('bk_id', id)
      .update(data)
  },

  //! update status np  booking  *******
  updateStatusNp(db, data, id) {
    return db('tb_night_place')
      .where('np_id', id)
      .update(data)
  },

  //! add Promotions *******
  addPromotions(db, data, id) {
    return db('tb_promotions').insert(data, 'pro_id')
      .leftJoin('tb_user', 'tb_promotions.id', id, 'tb_night_place.np_id');
  },

  //! แสดง Promotions *******
  getPromotions(db) {
    return db('tb_promotions').orderBy('tb_promotions.pro_id', 'desc')
    // .where('tb_promotions.np_id', id)
    .leftJoin('tb_promotions_img', 'tb_promotions.pro_id', 'tb_promotions_img.pro_id')
    .leftJoin('tb_night_place', 'tb_promotions.np_id', 'tb_night_place.np_id')
    .select('*');
  },

    //! แสดง Promotions *******
    getPromotionsNp(db,id) {
      return db('tb_promotions').orderBy('tb_promotions.pro_id', 'desc')
      .where('tb_promotions.np_id', id)
      .leftJoin('tb_promotions_img', 'tb_promotions.pro_id', 'tb_promotions_img.pro_id')
      .select('*');
    },

  //! Get Info  Promotions  *******
  getInfoPromotions(db) {
    return db('tb_promotions')
      .orderBy('pro_id', 'desc')
      .select('tb_promotions.pro_id')
      .limit(1);
  },

  //! upload immage Promotions  *******
  uploadImagesPromotions(db, data) {
    return db('tb_promotions_img')
      .insert(data, 'id_img_pro');
  },

    //! แสดง image Promotions ให้ user *******
  getImagesPromotions(db) {
    return db('tb_promotions_img').orderBy('id_img_pro', 'desc')
  },

  // getImagesNp(db) {
  //   return db('tb_night_place_imgs').orderBy('np_img_id', 'desc'.limit(1))
  //     .leftJoin('tb_night_place', 'tb_night_place_imgs.np_id', 'tb_night_place.np_id')
  //     // .leftJoin('tb_user', 'tb_reviews.user_id', 'tb_user.user_id')
  //     .select('*')
  //   // .limit(1);
  // },
  

};