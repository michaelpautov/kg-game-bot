
export default function Home() {
  return (
      <div>
        <div id="script"
             dangerouslySetInnerHTML={ { __html: `<script src="https://cdn.htmlgames.com/embed.js?game=PinballBreakout&amp;bgcolor=#1a1a1a"></script>` } }/>
      </div>
  );
}
