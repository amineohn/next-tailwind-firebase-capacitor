export const configuration = {
  appId: "Demo-app",
  nameApp: "name-app",
  server: {
    url: "https://next-tailwind-firebase-capacitor-9ja7hw8uz-amineprojet7.vercel.app",
  },
  title: "title",
  description: "",
  openGraph: {
    title: "title",
    description: "description",
    url: "url",
    image: "image",
    width: 600,
    height: 600,
    alt: "hello",
  },
  firebase: {
    apiKey: "AIzaSyDB6kaXHG4Hycn-C57tgXZkz2CQeIm0Cs8",
    authDomain: "fir-b57a9.firebaseapp.com",
    projectId: "fir-b57a9",
    storageBucket: "fir-b57a9.appspot.com",
    messagingSenderId: "300061913823",
    appId: "1:300061913823:web:e6b954d7671f7260f9ef6a",
    measurementId: "G-WWSQ79NKM2",
  },
  regex: {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    collectTime: /^[0-9]{1,2}:[0-9]{2}$/,
    address: /^[a-zA-Z0-9\s,'-]{1,}$/,
    phone: /^[0-9]{10}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z\s]{1,}$/,
    frequency: /^[0-9]{1,2}$/,
  },
};
