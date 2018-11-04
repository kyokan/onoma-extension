import React, { Component } from 'react';
import './get-coins.scss';

// eslint-disable-next-line react/prop-types
const Step = ({ number, title, paragraph }) => (
  <div className="get-coins__step">
    <div className="get-coins__step-number">{number}</div>
    <div className="get-coins__step-content">
      <div className="get-coins__step-title">{title}</div>
      <div className="get-coins__step-paragraph">{paragraph}</div>
    </div>
  </div>
);

export default class GetCoins extends Component {
  render() {
    return (
      <div className="get-coins">
        <div className="get-coins__left">
          <div className="get-coins__ascii-panel">
            <pre>
              <code>   ___    ______ ____   ____     __  __ _   __ _____ </code>
              <code>  |__ \  / ____// __ \ / __ \   / / / // | / // ___/ </code>
              <code>  __/ / /___ \ / / / // / / /  / /_/ //  |/ / \__ \  </code>
              <code> / __/ ____/ // /_/ // /_/ /  / __  // /|  / ___/ /  </code>
              <code>/____//_____/ \____/ \____/  /_/ /_//_/ |_/ /____/   </code>
            </pre>
            <pre>
              <code>   ___    ______ ____   ____     __  __ _   __ _____ </code>
              <code>  |__ \  / ____// __ \ / __ \   / / / // | / // ___/ </code>
              <code>  __/ / /___ \ / / / // / / /  / /_/ //  |/ / \__ \  </code>
              <code> / __/ ____/ // /_/ // /_/ /  / __  // /|  / ___/ /  </code>
              <code>/____//_____/ \____/ \____/  /_/ /_//_/ |_/ /____/   </code>
            </pre>
            <pre>
              <code>   ___    ______ ____   ____     __  __ _   __ _____ </code>
              <code>  |__ \  / ____// __ \ / __ \   / / / // | / // ___/ </code>
              <code>  __/ / /___ \ / / / // / / /  / /_/ //  |/ / \__ \  </code>
              <code> / __/ ____/ // /_/ // /_/ /  / __  // /|  / ___/ /  </code>
              <code>/____//_____/ \____/ \____/  /_/ /_//_/ |_/ /____/   </code>
            </pre>
          </div>
          <Step
            number={1}
            title="Generate a Handshake Address"
            paragraph="Bird bird bird bird bird bird human why take bird out i could have eaten that stretch. Damn that dog meow, and what a cat-ass-trophy! and play riveting piece on synthesizer keyboard or i show my fluffy belly but it's a trap!"
          />
          <Step
            number={2}
            title="Copy and Paste Your SSH Proof Here"
            paragraph="Bring your owner a dead bird cuddle no cuddle cuddle love scratch scratch or stand with legs in litter box, but poop outside lounge in doorway."
          />
          <Step
            number={3}
            title="Generate a Handshake Address"
            paragraph="Intently stare at the same spot hiding behind the couch until lured out by a feathery toy make meme, make cute face for play riveting piece on synthesizer keyboard dismember a mouse and then regurgitate parts of it on the family room floor so sleep on keyboard."
          />
        </div>
        <div className="get-coins__right">
          <div className="get-coins__panel">
            <div className="get-coins__panel__title">Claim your coins with a proof</div>
            <div className="get-coins__panel__offer">
              <div>+2500 HNS</div>
              <div>GitHub Developers</div>
              <div><span>15 or more followers</span></div>
              <div>SSH keys</div>
              <button>Submit GitHub Proof</button>
            </div>
            <div className="get-coins__panel__offer">
              <div>+2500 HNS</div>
              <div>PGP Web of Trust</div>
              <div>Strong set email</div>
              <div>SSH keys</div>
              <button>Submit PGP Proof</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
