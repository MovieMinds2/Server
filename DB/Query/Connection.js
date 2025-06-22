let mariadb;

const connect = async () => {
  try {
    mariadb = await getConnection();
    return mariadb;
  } catch (err) {
    console.error(err.code, ":", err.message);
  }
};
