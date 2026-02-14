import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import style from "./styles/footer.scss";

interface Options {
  links: Record<string, string>;
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {};
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          Built with <a href="https://quartz.jzhao.xyz/">Quartz</a> ·{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            rel="license"
          >
            CC BY-NC-SA
          </a>
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    );
  };

  Footer.css = style;
  return Footer;
}) satisfies QuartzComponentConstructor;
