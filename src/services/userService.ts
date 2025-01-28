// src/services/userService.ts
export async function registerUser(data: {
  email: string;
  password: string;
  passwordConfirm: string;
}): Promise<{ error: boolean; message: string; field?: string }> {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        error: true,
        message: errorResponse.message,
        field: errorResponse.field,
      };
    }

    return { error: false, message: "Usuario registrado con éxito" };
  } catch  {
    return { error: true, message: "Error al comunicarse con el servidor" };
  }
} // Fin del archivo
