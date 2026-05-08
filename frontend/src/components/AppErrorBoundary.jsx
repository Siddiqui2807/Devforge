import { Component } from "react";

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application render error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <section className="surface-card w-full max-w-lg p-8 text-center">
            <p className="section-eyebrow">DevForge</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-100">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              The page failed to render correctly. Reload the app to continue.
            </p>
            <button type="button" className="btn-primary mt-5" onClick={this.handleReload}>
              Reload Application
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
