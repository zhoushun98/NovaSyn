import { readFileSync } from "node:fs";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home", () => {
  it("shows the English homepage by default", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /build intelligence into every critical workflow/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /en/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("link", { name: /book a demo/i }).length).toBeGreaterThan(0);
  });

  it("does not force all links to inherit text color globally", () => {
    const css = readFileSync("/Users/jason/Desktop/web/src/app/globals.css", "utf8");

    expect(css).not.toMatch(/a\s*\{[^}]*color:\s*inherit;?/s);
  });

  it("keeps the hero compact enough to reveal lower content on first view", () => {
    const source = readFileSync("/Users/jason/Desktop/web/src/app/page.tsx", "utf8");

    expect(source).toContain("items-center gap-8 pb-6 pt-2 md:gap-10 md:pb-8 md:pt-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-10 lg:pb-10 lg:pt-6");
    expect(source).toContain("mt-6");
    expect(source).toContain("mt-6 max-w-2xl text-[1.02rem] leading-8 text-white/62 md:text-lg md:leading-9");
  });

  it("switches homepage copy to Chinese", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /中文/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /把智能真正嵌入每一个关键业务流程/i,
        }),
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("localizes the hero control panel when switching to Chinese", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /中文/i }));

    await waitFor(() => {
      expect(screen.getByText(/运营智能/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/operational intelligence/i)).not.toBeInTheDocument();
  });
});
