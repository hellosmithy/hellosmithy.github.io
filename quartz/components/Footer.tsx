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
          Built with <a href="https://quartz.jzhao.xyz/">Quartz</a>
          <span class="delimiter"> · </span>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            rel="license"
          >
            CC BY-NC-SA
          </a>
        </p>
        <p>
          {Object.entries(links).map(([text, link], i) => (
            <>
              {i > 0 && <span class="delimiter"> · </span>}
              <a href={link}>{text}</a>
            </>
          ))}
        </p>
      </footer>
    );
  };

  Footer.css = style;
  return Footer;
}) satisfies QuartzComponentConstructor;
