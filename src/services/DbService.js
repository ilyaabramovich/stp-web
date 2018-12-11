import Api from "./Api";

export default {
  test(data) {
    return Api().post("test", data);
  }
};
