import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import dotenv from 'dotenv';

// dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // module.exports = {
  //   publicPath: process.env.NODE_ENV === "production" ? "/Daily-Expense-Tracker/" : "/",
  // },

  // define: {
	// 	// Pass environment variables to the app
	// 	'import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY': JSON.stringify(
	// 		process.env.VITE_REACT_APP_FIREBASE_API_KEY
	// 	),
	// 	'import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN': JSON.stringify(
	// 		process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN
	// 	),
	// 	'import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID': JSON.stringify(
	// 		process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID
	// 	),
	// 	'import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET': JSON.stringify(
	// 		process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET
	// 	),
	// 	'import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
	// 		process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID
	// 	),
	// 	'import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID': JSON.stringify(
	// 		process.env.VITE_REACT_APP_FIREBASE_APP_ID
	// 	)
	// }
})
