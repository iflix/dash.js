/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}var _coreFactoryMaker=require('../../core/FactoryMaker');var _coreFactoryMaker2=_interopRequireDefault(_coreFactoryMaker);var _SegmentsUtils=require('./SegmentsUtils');function TemplateSegmentsGetter(config,isDynamic){var timelineConverter=config.timelineConverter;var instance=undefined;function getSegmentsFromTemplate(representation,requestedTime,index,availabilityUpperLimit){var template=representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentTemplate;var duration=representation.segmentDuration;var availabilityWindow=representation.segmentAvailabilityRange;var segments=[];var url=null;var seg=null;var segmentRange=undefined,periodSegIdx=undefined,startIdx=undefined,endIdx=undefined,start=undefined;start = representation.startNumber;if(isNaN(duration) && !isDynamic){segmentRange = {start:start,end:start};}else {segmentRange = (0,_SegmentsUtils.decideSegmentListRangeForTemplate)(timelineConverter,isDynamic,representation,requestedTime,index,availabilityUpperLimit);}startIdx = segmentRange.start;endIdx = segmentRange.end;for(periodSegIdx = startIdx;periodSegIdx <= endIdx;periodSegIdx++) {seg = (0,_SegmentsUtils.getIndexBasedSegment)(timelineConverter,isDynamic,representation,periodSegIdx);seg.replacementTime = (start + periodSegIdx - 1) * representation.segmentDuration;url = template.media;url = (0,_SegmentsUtils.replaceTokenForTemplate)(url,'Number',seg.replacementNumber);url = (0,_SegmentsUtils.replaceTokenForTemplate)(url,'Time',seg.replacementTime);seg.media = url;segments.push(seg);seg = null;}if(isNaN(duration)){representation.availableSegmentsNumber = 1;}else {representation.availableSegmentsNumber = Math.ceil((availabilityWindow.end - availabilityWindow.start) / duration);}return segments;}instance = {getSegments:getSegmentsFromTemplate};return instance;}TemplateSegmentsGetter.__dashjs_factory_name = 'TemplateSegmentsGetter';var factory=_coreFactoryMaker2['default'].getClassFactory(TemplateSegmentsGetter);exports['default'] = factory;module.exports = exports['default'];
//# sourceMappingURL=TemplateSegmentsGetter.js.map
