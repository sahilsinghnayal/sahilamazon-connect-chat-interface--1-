// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import PT from "prop-types";
import { FormattedMessage } from "react-intl";
import { CONTACT_STATUS } from "../../constants/global";
import ChatTranscriptor from "./ChatTranscriptor";
import ChatComposer from "./ChatComposer";
import ChatActionBar from "./ChatActionBar";
import React, { Component } from "react";
import { Text } from "connect-core";
import styled from "styled-components";
import renderHTML from "react-render-html";
const ACTION_BAR_HEIGHT = "85px";
// const ChatWrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   @media (max-width: 640px) {
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     right: 0;
//     left: 0;
//   }
// `;

const ChatWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
// const ParentHeaderWrapper = styled.div`
//   margin: 0;
//   padding: 0;
//   order: 1;
//   @media (max-width: 640px) {
//     position: absolute;
//     left: 0;
//     top: 0;
//     right: 0;
//   }
// `;
const ParentHeaderWrapper = styled.div`
  margin: 0;
  padding: 0;
  order: 1;
`;

// const ChatComposerWrapper = styled.div`
//   order: 2;
//   margin: 0;
//   padding: 0;
//   display: flex;
//   flex-direction: column;
//   height: 340px;
//   @media (max-width: 640px) {
//     position: absolute;
//     left: 0;
//     bottom: 85px;
//     right: 0;
//     top: ${(props) =>
//       props.parentHeaderWrapperHeight + 100}px; /* Added 100px for disclaimer */
//     min-height: auto;
//   }
// `;
const ChatComposerWrapper = styled.div`
  order: 2;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  // height: 340px;
`;
const StickyFooter = styled.div`
  position: sticky;
  bottom: 85px; /* Above the action bar */
  background: #126682;
  z-index: 10;
  padding: 3px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const DisclaimerText = styled.div`
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuickRepliesContainer = styled.div`
  display: flex;
  gap: 3px;
  // padding: 8px 0;
  background: white;
  flex-wrap: wrap;
  border-top: ${(props) => (props.showDisclaimer ? "1px solid #eee" : "none")};
`;
// Add these near your other styled components (like ChatWrapper, HeaderWrapper, etc.)
const DisclaimerBanner = styled.div`
  background: #f8f8f8;
  padding: 12px 16px;
  margin: 0 16px 8px;
  border-radius: 4px;
  position: relative;
  border: 1px solid #e0e0e0;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: #4d3d3d;
  border: none;
  cursor: pointer;
  color: rgb(255 255 255);
  padding: 4px;
  border-radius: 7px;
  margin-left: 8px;
`;

const QuickReplyContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 0;
  flex-wrap: wrap;
`;

const QuickReplyButton = styled.button`
  border: none;
  color: white;
  padding: 4px 12px;
  background: rgb(37 131 216);
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
`;
const StickyQuickReplyContainer = styled.div`
  position: sticky;
  bottom: ${ACTION_BAR_HEIGHT}; /* Above action bar */
  background: white;
  z-index: 10;
  padding: 2px;
  border-top: 1px solid #eee;
  transition: all 0.3s ease;
`;

const CollapsibleDisclaimer = styled.div`
  color: white;
  background: rgb(212 23 23);
  padding: 12px;
  // margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderWrapper = styled.div`
  background: #3f5773;
  text-align: center;
  padding: 16px;
  color: #fff;
  border-radius: 3px;
  flex-shrink: 0;
`;
const WelcomeText = styled(Text)`
  padding-bottom: 10px;
`;

const defaultHeaderConfig = {
  isHTML: false,
  render: () => {
    return (
      <HeaderWrapper>
        <WelcomeText type={"h2"}>
          <FormattedMessage
            id="header.headerText"
            defaultMessage="Hi there! "
          />
        </WelcomeText>
        {/*TODO: translate below texts*/}
        <Text type={"p"}>
          This is an example of how customers experience chat on your website
        </Text>
      </HeaderWrapper>
    );
  },
};

Header.defaultProps = {
  headerConfig: {},
};

function Header({ headerConfig }) {
  const config = Object.assign({}, defaultHeaderConfig, headerConfig);

  if (config.isHTML) {
    return renderHTML(config.render());
  } else {
    return config.render();
  }
}

const textInputRef = React.createRef();
const HEADER_HEIGHT = 115;

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: [],
      typingParticipants: [],
      contactStatus: CONTACT_STATUS.DISCONNECTED,
      parentHeaderWrapperHeight: HEADER_HEIGHT,
      showDisclaimer: true,
      showQuickReplies: false,
      disclaimerClosed: false,
      quickReplies: ["Inquire", "Support", "Cancellation"],
    };
    this.handleQuickReply = this.handleQuickReply.bind(this);
    this.handleCloseDisclaimer = this.handleCloseDisclaimer.bind(this);

    this.parentHeaderRef = React.createRef();
    this.updateTranscript = (transcript) =>
      this.setState({ transcript: [...transcript] });
    this.updateTypingParticipants = (typingParticipants) =>
      this.setState({ typingParticipants });
    this.updateContactStatus = (contactStatus) =>
      this.setState({ contactStatus });
    if (window.connect && window.connect.LogManager) {
      this.logger = window.connect.LogManager.getLogger({
        prefix: "ChatInterface-Chat",
      });
    }
  }
  handleCloseDisclaimer = () => {
    this.setState({
      showDisclaimer: false,
      showQuickReplies: true,
      disclaimerClosed: true,
    });
  };
  handleQuickReply = (reply) => {
    this.props.chatSession.addOutgoingMessage({ text: reply });
  };

  // Proper class method definition

  static propTypes = {
    chatSession: PT.object.isRequired,
    composerConfig: PT.object,
    onEnded: PT.func,
  };

  static defaultProps = {
    onEnded: () => {},
  };

  resetChatHeight() {
    this.setState({
      parentHeaderWrapperHeight:
        this.parentHeaderRef && this.parentHeaderRef.current
          ? this.parentHeaderRef.current.clientHeight
          : HEADER_HEIGHT,
    });
  }

  componentDidMount() {
    this.init(this.props.chatSession);
    this.resetChatHeight();
    if (typeof this.props.changeLanguage === "function") {
      this.props.changeLanguage(this.props.language);
    }
    this.logger && this.logger.info("Component mounted.");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chatSession !== this.props.chatSession) {
      this.cleanUp(prevProps.chatSession);
      this.init(this.props.chatSession);
    }
    if (
      prevProps.language !== this.props.language &&
      typeof this.props.changeLanguage === "function"
    ) {
      this.props.changeLanguage(this.props.language);
    }
  }

  componentWillUnmount() {
    this.cleanUp(this.props.chatSession);
  }

  init(chatSession) {
    this.setState({ contactStatus: chatSession.contactStatus });
    chatSession.on("transcript-changed", this.updateTranscript);
    chatSession.on(
      "typing-participants-changed",
      this.updateTypingParticipants
    );
    chatSession.on("contact-status-changed", this.updateContactStatus);
  }

  cleanUp(chatSession) {
    chatSession.off("transcript-changed", this.updateTranscript);
    chatSession.off(
      "typing-participants-changed",
      this.updateTypingParticipants
    );
    chatSession.off("contact-status-changed", this.updateContactStatus);
  }

  endChat() {
    this.props.chatSession.endChat();
    this.props.onEnded();
  }

  closeChat() {
    this.props.chatSession.closeChat();
    this.props.onEnded();
  }
  /*
  Note: For Mobile layout: divided into 3 sections
  1. Header - Positon: absolute; top: 0, left: 0, right: 0 - height is dynamic!
  2. MainContent - Position: absolute; top: {dynamicHeight}, left: 0, right: 0, bottom: {fixedFooterHeight: 85px}
  3. Footer - position: absolute; bottom: 0, right: 0, left: 0
  -- this prevents overlay from overflowing in mobile browser. 
*/
  render() {
    const { showDisclaimer, quickReplies } = this.state;

    const {
      chatSession,
      headerConfig,
      transcriptConfig,
      composerConfig,
      footerConfig,
    } = this.props;
    console.log("MESSAGES", this.state.transcript);

    return (
      <ChatWrapper data-testid="amazon-connect-chat-wrapper">
        {(this.state.contactStatus === CONTACT_STATUS.CONNECTED ||
          this.state.contactStatus === CONTACT_STATUS.CONNECTING ||
          this.state.contactStatus === CONTACT_STATUS.ENDED) && (
          <ParentHeaderWrapper ref={this.parentHeaderRef}>
            <Header headerConfig={headerConfig} />
          </ParentHeaderWrapper>
        )}

        <ChatComposerWrapper
          parentHeaderWrapperHeight={this.state.parentHeaderWrapperHeight}
        >
          <ChatTranscriptor
            loadPreviousTranscript={() => chatSession.loadPreviousTranscript()}
            addMessage={(data) => chatSession.addOutgoingMessage(data)}
            downloadAttachment={(attachmentId) =>
              chatSession.downloadAttachment(attachmentId)
            }
            transcript={this.state.transcript}
            typingParticipants={this.state.typingParticipants}
            contactStatus={this.state.contactStatus}
            contactId={chatSession.contactId}
            transcriptConfig={transcriptConfig}
            textInputRef={textInputRef}
            sendReadReceipt={(...inputParams) =>
              chatSession.sendReadReceipt(...inputParams)
            }
          />
          <StickyQuickReplyContainer>
            {this.state.showDisclaimer && (
              <CollapsibleDisclaimer>
                <span>
                  Please note: Chat responses may be monitored for quality
                  assurance.
                </span>
                <CloseButton onClick={this.handleCloseDisclaimer}>
                  ✕
                </CloseButton>
              </CollapsibleDisclaimer>
            )}

            {this.state.showQuickReplies && (
              <QuickRepliesContainer>
                {this.state.quickReplies.map((reply, index) => (
                  <QuickReplyButton
                    key={index}
                    onClick={() => this.handleQuickReply(reply)}
                  >
                    {reply}
                  </QuickReplyButton>
                ))}
              </QuickRepliesContainer>
            )}
          </StickyQuickReplyContainer>
          {this.state.disclaimerClosed && (
            <ChatComposer
              contactStatus={this.state.contactStatus}
              contactId={chatSession.contactId}
              addMessage={(contactId, data) =>
                chatSession.addOutgoingMessage(data)
              }
              addAttachment={(contactId, attachment) =>
                chatSession.addOutgoingAttachment(attachment)
              }
              onTyping={() => chatSession.sendTypingEvent()}
              composerConfig={composerConfig}
              textInputRef={textInputRef}
            />
          )}
        </ChatComposerWrapper>

        {this.state.disclaimerClosed && (
          <ChatActionBar
            onEndChat={() => this.endChat()}
            onClose={() => this.closeChat()}
            contactStatus={this.state.contactStatus}
            footerConfig={footerConfig}
          />
        )}
      </ChatWrapper>
    );
  }
}
