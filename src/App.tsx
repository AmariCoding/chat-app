import Auth from "./components/Auth";
import { useChatStore } from "./store/chatStore";
import { supabase } from "./supabaseClient";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
const App = () => {
  const { user, setUser } = useChatStore();

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const session = response.data.session;
      setUser({ id: session?.user.id || "", email: session?.user.email || "" });
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session?.user.id || "",
          email: session?.user.email || "",
        });
      } else {
        setUser(null);
      }
    });

    const subscription = data.subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return <Auth />;
  }

  return <Dashboard />;
};

export default App;
