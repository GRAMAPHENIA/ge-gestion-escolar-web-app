  // // src/components/Instituciones.tsx
  // "use client";

  // import React, { useState, useEffect } from "react";
  // import { supabase } from "@/supabase/supabaseClient";

  // interface Institution {
  //   id: string;
  //   name: string;
  //   code: string;
  //   email: string;
  //   phone: string;
  //   address: string;
  //   city: string;
  //   country: string;
  // }

  // const Institutions = () => {
  //   const [institutions, setInstitutions] = useState<Institution[]>([]);
  //   const [formData, setFormData] = useState<Partial<Institution>>({});
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchInstitutions = async () => {
  //       const { data, error } = await supabase.from("institutions").select("*");
  //       if (error) {
  //         console.error("Error fetching institutions:", error);
  //       } else {
  //         setInstitutions(data || []);
  //       }
  //     };

  //     fetchInstitutions();
  //   }, []);

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     const { data, error } = await supabase.from("institutions").insert([formData]);
  //     if (error) {
  //       console.error("Error adding institution:", error);
  //     } else {
  //       setInstitutions((prev) => [...prev, ...(data || [])]);
  //       setFormData({});
  //     }
  //     setLoading(false);
  //   };

  //   return (
  //     <div className="text-gray-200">
  //       <h2 className="text-2xl font-bold mb-4">Gestión de Instituciones</h2>

  //       {/* Formulario para agregar institución */}
  //       <form
  //         className="bg-gray-800 p-6 rounded-md mb-6 space-y-4"
  //         onSubmit={handleSubmit}
  //       >
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <input
  //             type="text"
  //             name="name"
  //             placeholder="Nombre"
  //             value={formData.name || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //           <input
  //             type="text"
  //             name="code"
  //             placeholder="Código"
  //             value={formData.code || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Email"
  //             value={formData.email || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //           <input
  //             type="text"
  //             name="phone"
  //             placeholder="Teléfono"
  //             value={formData.phone || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //           <input
  //             type="text"
  //             name="address"
  //             placeholder="Dirección"
  //             value={formData.address || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //           <input
  //             type="text"
  //             name="city"
  //             placeholder="Ciudad"
  //             value={formData.city || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //           <input
  //             type="text"
  //             name="country"
  //             placeholder="País"
  //             value={formData.country || ""}
  //             onChange={handleChange}
  //             required
  //             className="p-2 bg-gray-700 rounded-md text-gray-300"
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="bg-teal-600/20 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 transition duration-100 rounded-md px-4 py-2 mt-4"
  //         >
  //           {loading ? "Cargando..." : "Agregar Institución"}
  //         </button>
  //       </form>

  //       {/* Grid para mostrar instituciones */}
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         {institutions.length === 0 ? (
  //           <div className="col-span-1 md:col-span-3 text-center text-gray-400">
  //             No hay instituciones registradas.
  //           </div>
  //         ) : (
  //           institutions.map((institution) => (
  //             <div
  //               key={institution.id}
  //               className="bg-gray-800 p-4 rounded-md shadow-md"
  //             >
  //               <p className="text-xl font-bold mb-2">{institution.name}</p>
  //               <p><strong>Código:</strong> {institution.code}</p>
  //               <p><strong>Email:</strong> {institution.email}</p>
  //               <p><strong>Teléfono:</strong> {institution.phone}</p>
  //               <p><strong>Dirección:</strong> {institution.address}</p>
  //               <p><strong>Ciudad:</strong> {institution.city}</p>
  //               <p><strong>País:</strong> {institution.country}</p>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // export default Institutions;
