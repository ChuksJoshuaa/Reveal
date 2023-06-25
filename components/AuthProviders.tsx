"use client";

import { Provider, Providers } from "@/utils/interfaces";
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  const fetchProviders = async () => {
    try {
      const resp = await getProviders();
      setProviders(resp);
    } catch (error) {
      alert("Error dey o");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i: number) => (
          <button key={i}>{provider.id}</button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
