import { useState } from "react";
import "./Gestion.css";

export default function RegistroCRUD({ title, fields, initialData = [] }) {
  const emptyForm = Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === editingId ? { ...form, id: editingId } : it
        )
      );
      setEditingId(null);
    } else {
      setItems((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }

    setForm(emptyForm);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm(Object.fromEntries(fields.map((f) => [f.key, item[f.key] ?? ""])));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (editingId === id) handleCancelEdit();
  };

  return (
    <div className="registro">
      <h2 className="registro__titulo">{title}</h2>

      <form className="registro__form" onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div className="registro__campo" key={f.key}>
            <label htmlFor={`${title}-${f.key}`}>{f.label}</label>

            {f.type === "select" ? (
              <select
                id={`${title}-${f.key}`}
                value={form[f.key]}
                onChange={(e) => handleChange(f.key, e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona...
                </option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${title}-${f.key}`}
                type={f.type || "text"}
                value={form[f.key]}
                onChange={(e) => handleChange(f.key, e.target.value)}
                required
              />
            )}
          </div>
        ))}

        <div className="registro__acciones-form">
          <button type="submit" className="btn btn--rojo">
            {editingId ? "Guardar cambios" : "Agregar"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn--outline"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="registro__tabla-wrap">
        <table className="registro__tabla">
          <thead>
            <tr>
              {fields.map((f) => (
                <th key={f.key}>{f.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={fields.length + 1} className="registro__vacio">
                  Aún no hay registros.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  {fields.map((f) => (
                    <td key={f.key}>{item[f.key]}</td>
                  ))}
                  <td className="registro__fila-acciones">
                    <button
                      className="btn-icono btn-icono--editar"
                      onClick={() => handleEdit(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-icono btn-icono--borrar"
                      onClick={() => handleDelete(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}