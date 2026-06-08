// EXAMPLE 1
function CubicSecPortal() {
  const [formData, setFormData] = useState(...)
  const [errors, setErrors] = useState(...)
  const [loading, setLoading] = useState(...)

  function handleChange() { }
  function validate() { }
  function handleSubmit() { }

  return (...)
}

// The component contains both UI and logic. This makes it difficult to test the logic without rendering the UI, and vice versa. It also makes the component less reusable, as the logic is tightly coupled with the specific UI implementation.
// Instead, we can separate the logic into a custom hook, which can be tested independently and reused across different components.