import { useEffect } from "react";
import "./auth.css";
import { Path } from "@syncfusion/ej2-react-diagrams";
import { useNavigate } from "react-router-dom";
function refreshToken() {
  const refreshToken = window.localStorage.getItem("refresh_token");
  let accessToken = window.localStorage.getItem("access_token");

  let refreshTokenTimeout;
  const nav = useNavigate();
  useEffect(() => {
    const refreshAccessToken = () => {
      fetch("http://127.0.0.1:8000/account/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Unable to refresh access token");
          }
        })
        .then((data) => {
          // Store the new access token and refresh token
          accessToken = data.access;
          window.localStorage.setItem("access_token", accessToken);

          const refreshToken = data.refresh;
          window.localStorage.setItem("refresh_token", refreshToken);

          // Schedule the next token refresh
          const now = Date.now();
          try {
            const expiresIn =
              JSON?.parse(atob(accessToken?.split(".")[1])).exp * 1000 - now;
            refreshTokenTimeout = setTimeout(refreshAccessToken, expiresIn);
          } catch (error) {
            nav("/login")
          }
        })
        .catch((error) => {
          // Handle errors here
        });
    };

    const now = Date.now();
    try {
      const expiresIn =
        JSON.parse(atob(accessToken?.split(".")[1])).exp * 1000 - now;
      refreshTokenTimeout = setTimeout(refreshAccessToken, expiresIn);
    } catch (error) {
      nav("/")
    }

    return () => {
      clearTimeout(refreshTokenTimeout);
    };
  }, [refreshToken, accessToken]);

  return null;
}

export default refreshToken;
