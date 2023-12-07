import axios from "axios";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2M1NDI2MjhmN2RmZmE3MDBmYmVlNjFmMDA2YzVhNiIsInN1YiI6IjY1NTY2YTZmYjU0MDAyMTRkMDZlNmI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sB3pFgZdY1OodWfNwHBbQATjhiZdpoSADbEN1_mIbqY";
export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
