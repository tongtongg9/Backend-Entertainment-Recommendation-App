
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

  //! แสดงข้อมูลร้าน by Owner *******
  getListNpbyOw(db, id) {
    return db('tb_night_place').orderBy('np_id', 'desc').where('ow_id', id);
  },

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
      .where('np_id', id)
      .update(data);
  },

  remove(db, id) {
    return db('users')
      .where('id', id)
      .del();
  },

  //! แสดงข้อมูล user *******
  getInfoUser(db, id) {
    return db('tb_user')
      .where('user_id', id);
  },

  //! แสดงข้อมูล owner *******
  getInfoOw(db, id) {
    return db('tb_owner')
      .where('ow_id', id);
  },

  //! แสดงข้อมูลร้านให้ user *******
  getDataNp(db) {
    return db('tb_night_place').orderBy('np_id', 'desc');
  },

  getListImagesNp(db,id) {
    return db('tb_night_place_imgs').where('tb_night_place_imgs.np_id',id)
    .select('*')
    // .leftJoin('tb_night_place_imgs', 'tb_night_place.np_id,tb_night_place_imgs.np_id');
  },

  getImagesNp(db) {
    return db('tb_night_place').orderBy('np_id', 'desc')
    .leftJoin('tb_night_place_imgs', 'tb_night_place.np_id,tb_night_place_imgs.np_id');
  },

  //! Get ข้อมูลร้าน *******
  getInfoNp(db) {
    return db('tb_night_place')
      .orderBy('np_id', 'desc')
      .select('tb_night_place.np_id')
      .limit(1);
  },

  //! upload immage profile user *******
  sendImages(db, data, id) {
    return db('tb_user').where('user_id', id).update(data);
  },

  //! upload immage np *******
  uploadImagesnp(db, data) {
    return db('tb_night_place_imgs')
    .insert(data, 'np_img_id');
  },

};